declare type Action = { type: string, response: any, payload: any, auth: FirebaseAuth };

declare type Dispatch = (action: Action | ThunkAction) => any;

declare type GetState = () => object;

declare type ThunkAction = (Function, Function) => any;
