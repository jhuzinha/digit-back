/* istanbul ignore next */
import * as e2eRepository from "../repositories/e2eRepository";
export async function truncate() {
  /* istanbul ignore next */
  await e2eRepository.truncate();
}