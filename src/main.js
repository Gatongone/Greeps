import { error_tracer } from "./env/error_tracer"
import { procedure } from "./env/procedure"

export const loop = error_tracer(() => {
    procedure();
});