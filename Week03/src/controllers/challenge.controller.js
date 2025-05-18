import challengeService from "../services/challenge.service.js";

class ChallengeController {
  async createChallenge(req, res) {
    try {
      const missionId = parseInt(req.params.missionId);

      const createdChallenge = await challengeService.createChallenge(
        missionId
      );

      return res.status(201).json({
        message: "Challenge started successfully",
        challenge: createdChallenge,
      });
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes("already challenging")) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: `Failed to create challenge: ${error.message}` });
    }
  }
}

export default new ChallengeController();