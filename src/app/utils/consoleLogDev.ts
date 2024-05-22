import { environment } from "src/environments/environment";

export function consoleLogDev(message: any) {
  if (environment.production === false) {
    console.log(message);
  }
}
