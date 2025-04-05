export class Logger {
  static info(message: string, ...args: any[]) {
    console.log(`[INFO] ${new Date().toLocaleString()} - ${message}`, ...args);
  }

  static warn(message: string, ...args: any[]) {
    console.log(
      `[WARNNING] ${new Date().toLocaleString()} - ${message}`,
      ...args
    );
  }

  static error(message: string, ...args: any[]) {
    console.log(`[ERROR] ${new Date().toLocaleString()} - ${message}`, ...args);
  }
}
