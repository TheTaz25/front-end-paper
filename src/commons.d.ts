type Maybe<T> = T | undefined | null;
type ReducerAction<Action, Payload> = {
  type: Action,
  payload: Payload,
}

/**
 * Shortcut for ChangeEventHandler type
 */
type CEH<T> = React.ChangeEventHandler<T>
/**
 * Shortcut for FormEventHandler type
 */
type FEH<T> = React.FormEventHandler<T>