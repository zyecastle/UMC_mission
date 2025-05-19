export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class StoreNotFoundError extends Error {
    errorCode = "S001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class ReviewStoreNotFoundError extends Error {
    errorCode = "R001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

export class DuplicateMissionChallengeError extends Error {
    errorCode = "M001";
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  