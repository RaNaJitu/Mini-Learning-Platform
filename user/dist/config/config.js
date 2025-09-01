"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    env;
    port;
    firebase_api_key;
    secret_hash_key;
    jwt_secret;
    recaptcha_secret;
    cs_secret_key;
    cs_agent_code;
    str_secret_key;
    str_agent_code;
    test_token;
    cs_ws_endpoint;
    s3_access_key_id;
    s3_secret_key;
    s3_rzpg_bucket_name;
    s3_public_bucket_name;
    redis_url;
    casino_jwt_secret;
    fawks_operator_id;
    fawks_ip;
    gap_operator_rsa_public_key;
    gap_operator_rsa_private_key;
    gap_operator_id;
    gap_provider_public_key;
    gap_provider_host;
    sbook_operator_id;
    sbook_partner_id;
    sbook_public_key;
    sbook_private_key;
    sbook_host;
    podds_operator_id;
    podds_partner_id;
    podds_public_key;
    podds_private_key;
    podds_host;
    socket_port;
    qtech_api_base;
    qtech_pass_phrase;
    qtech_api_user_name;
    qtech_api_password;
    supabase_url;
    mongodb_url;
    supabase_key;
    ip_geo_location_api_key;
    redis_password;
    socket_server_url;
    socket_server_token;
    onbuka_api_id;
    onbuka_api_key;
    onbuka_api_secret;
    onbuka_sms_url;
    players_common_tag;
    live_match_sports_url;
    verify_banking_otp;
    redis_adapter_url;
    redis_adapter_password;
    branch_api_token;
    pending_transaction_limit;
    place_bet_bypass_token;
    admin_queue_url;
    scorecard_url;
    constructor(env) {
        this.env = env.NODE_ENV || "DEVELOPMENT";
        this.port = this.getNumberValue(env.PORT);
        this.firebase_api_key = this.getFireBaseAPIKey(env.FIREBASE_API_KEY);
        this.secret_hash_key = this.getSecretHashKey(env.SECRET_HASH__KEY);
        this.jwt_secret = this.getJwtSecret(env.JWT_SECRET);
        this.recaptcha_secret = this.getRecaptchaSecret(env.RECAPTCHA_SECRET);
        this.cs_secret_key = this.getCSSecretKey(env.CS_SECRET_KEY);
        this.cs_agent_code = this.getCSSAgentCode(env.CS_AGENT_CODE);
        this.str_secret_key = this.getCSSecretKey(env.STR_SECRET_KEY);
        this.str_agent_code = this.getCSSAgentCode(env.STR_AGENT_CODE);
        this.test_token = env.WL_AUTHENTICATION_TOKEN || "";
        this.cs_ws_endpoint = env.CS_WS_ENDPOINT || "";
        this.s3_access_key_id = this.getS3AccessKeyId(env.S3_ACCESS_KEY_ID);
        this.s3_secret_key = this.getS3SecretKey(env.S3_SECRET_KEY);
        this.redis_url = env.REDIS_URL || "";
        this.s3_rzpg_bucket_name = this.getS3RZPBucketName(env.S3_RZPG_BUCKET_NAME);
        this.s3_public_bucket_name = this.getS3RZPBucketName(env.S3_PUBLIC_BUCKET_NAME);
        this.redis_url = env.REDIS_URL || "";
        this.casino_jwt_secret = env.CASINO_JWT_SECRET || "";
        this.fawks_operator_id = env.FAWKS_OPERATOR_ID || "";
        this.fawks_ip = env.FAWKS_IP || "";
        this.qtech_api_base = env.QTECH_API_BASE || "";
        this.qtech_pass_phrase = env.QTECH_PASS_PHRASE || "";
        this.qtech_api_user_name = env.QTECH_API_USER_NAME || "";
        this.qtech_api_password = env.QTECH_API_PASSWORD || "";
        this.sbook_operator_id = env.SBOOK_OPERATOR_ID || "";
        this.sbook_partner_id = env.SBOOK_PARTNER_ID || "";
        this.sbook_public_key = this.getRSAKey(env.SBOOK_PUBLIC_KEY);
        this.sbook_private_key = this.getRSAKey(env.SBOOK_PRIVATE_KEY);
        this.sbook_host = env.SBOOK_HOST || "";
        this.podds_operator_id = env.PODDS_OPERATOR_ID || "";
        this.podds_partner_id = env.PODDS_PARTNER_ID || "";
        this.podds_public_key = this.getRSAKey(env.PODDS_PUBLIC_KEY);
        this.podds_private_key = this.getRSAKey(env.PODDS_PRIVATE_KEY);
        this.podds_host = env.PODDS_HOST || "";
        this.gap_operator_rsa_public_key = this.getRSAKey(env.GAP_OPERATOR_RSA_PUBLIC_KEY) || "";
        this.gap_operator_rsa_private_key = this.getRSAKey(env.GAP_OPERATOR_RSA_PRIVATE_KEY) || "";
        this.gap_operator_id = env.GAP_OPERATOR_ID || "";
        this.gap_provider_public_key = this.getRSAKey(env.GAP_PROVIDER_PUBLIC_KEY) || "";
        this.gap_provider_host = env.GAP_PROVIDER_HOST || "";
        this.socket_port = Number(env.SOCKET_PORT) || 4011;
        this.supabase_url = env.SUPABASE_URL || "";
        this.supabase_key = env.SUPABASE_KEY || "";
        this.mongodb_url = env.MONGODB_URL || "";
        this.ip_geo_location_api_key = env.IP_GEOLOCATION_API_KEY || "";
        this.redis_password = env.REDIS_PWD || "";
        this.socket_server_url = env.SOCKET_SERVER_URL || "";
        this.socket_server_token = env.SOCKET_SERVER_TOKEN || "";
        this.onbuka_api_id = env.ONBUKA_API_ID || "";
        this.onbuka_api_key = env.ONBUKA_API_KEY || "";
        this.onbuka_api_secret = env.ONBUKA_API_SECRET || "";
        this.onbuka_sms_url = env.ONBUKA_SMS_URL || "";
        this.players_common_tag = env.PLAYERS_COMMON_TAG || "";
        this.live_match_sports_url = env.LIVE_MATCH_SPORTS_URL || "";
        this.verify_banking_otp = this.getBooleanValue(env.VERIFY_BANKING_OTP);
        this.redis_adapter_url = env.REDIS_ADAPTER_URL || "";
        this.redis_adapter_password = env.REDIS_ADAPTER_PWD || "";
        this.pending_transaction_limit = Number(env.PENDING_TRANSACTION_LIMIT) || 0;
        this.branch_api_token = env.BRANCH_API_TOKEN || "";
        this.place_bet_bypass_token = env.PLACE_BET_BYPASS_TOKEN || "";
        this.admin_queue_url = env.ADMIN_QUEUE_URL || "";
        this.scorecard_url = env.SCORECARD_URL || "";
    }
    getNumberValue(value) {
        return Number(value);
    }
    getFireBaseAPIKey(value) {
        return String(value);
    }
    getSecretHashKey(value) {
        return String(value);
    }
    getJwtSecret(value) {
        return String(value);
    }
    getRecaptchaSecret(value) {
        return String(value);
    }
    getCSSecretKey(value) {
        return String(value);
    }
    getCSSAgentCode(value) {
        return String(value);
    }
    getSTRSecretKey(value) {
        return String(value);
    }
    getSTRSAgentCode(value) {
        return String(value);
    }
    getS3RZPBucketName(value) {
        return String(value);
    }
    getS3AccessKeyId(value) {
        return String(value);
    }
    getS3SecretKey(value) {
        return String(value);
    }
    getBooleanValue(value) {
        return value === "true";
    }
    getRSAKey(value) {
        return String(value).split(String.raw `\n`).join("\n");
    }
}
exports.default = Config;
