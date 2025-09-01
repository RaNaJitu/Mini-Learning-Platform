type Environments = "DEVELOPMENT" | "PRODUCTION" | "TEST";

class Config {
  public env: Environments;
  public port: number;
  public jwt_secret: string;
  public database_url: string;
  public nats_url: string;

  constructor(env: NodeJS.ProcessEnv) {
    this.env = (process.env.NODE_ENV as Environments) || "DEVELOPMENT";
    this.port = this.getNumberValue(process.env.PORT);
    this.jwt_secret = this.getStringValue(process.env.JWT_SECRET);
    this.database_url = this.getStringValue(process.env.DATABASE_URL);
    this.nats_url = this.getStringValue(process.env.NATS_URL);
  }

  private getNumberValue(value: string | undefined): number {
    return Number(value) || 0;
  }

  private getStringValue(value: string | undefined): string {
    return String(value || "");
  }
}

export default Config;
