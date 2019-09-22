declare type Action = { type: string };

declare type Dispatch = (action: Action | ThunkAction) => any;

declare type GetState = () => object;

declare type ThunkAction = (Function, Function) => any;
