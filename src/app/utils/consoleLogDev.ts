import { environment } from "src/environments/environment";

export function consoleLogDev(message: object) {
  if (environment.production === false) {
    console.log(message);
  }
}
