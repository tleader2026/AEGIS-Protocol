#include "aegis_core.h"

#include <stdio.h>
#include <string.h>

static uint64_t aegis_fnv1a64(const uint8_t *data, size_t data_len) {
    uint64_t hash = 1469598103934665603ULL;
    for (size_t i = 0; i < data_len; i++) {
        hash ^= (uint64_t)data[i];
        hash *= 1099511628211ULL;
    }
    return hash;
}

static int aegis_contains(const char *data, size_t data_len, const char *needle) {
    size_t needle_len = strlen(needle);
    if (needle_len == 0 || data_len < needle_len) {
        return 0;
    }
    for (size_t i = 0; i <= data_len - needle_len; i++) {
        if (memcmp(data + i, needle, needle_len) == 0) {
            return 1;
        }
    }
    return 0;
}

int aegis_record_hash(const uint8_t *data, size_t data_len, char *out_hex, size_t out_len) {
    if (data == NULL || out_hex == NULL) {
        return AEGIS_ERR_NULL;
    }
    if (out_len < 25) {
        return AEGIS_ERR_BUFFER;
    }

    uint64_t hash = aegis_fnv1a64(data, data_len);
    int written = snprintf(out_hex, out_len, "fnv1a64:%016llx", (unsigned long long)hash);
    if (written < 0 || (size_t)written >= out_len) {
        return AEGIS_ERR_BUFFER;
    }
    return AEGIS_OK;
}

int aegis_record_validate(const char *json, size_t json_len) {
    if (json == NULL) {
        return AEGIS_ERR_NULL;
    }
    if (json_len < 2 || json[0] != '{' || !aegis_contains(json, json_len, "\"aegisVersion\"")) {
        return AEGIS_ERR_INVALID;
    }
    if (!aegis_contains(json, json_len, "\"signature\"")) {
        return AEGIS_ERR_INVALID;
    }
    return AEGIS_OK;
}

int aegis_signature_verify(const char *alg, const char *kid, const char *value) {
    if (alg == NULL || kid == NULL || value == NULL) {
        return AEGIS_ERR_NULL;
    }
    if (strlen(alg) == 0 || strlen(kid) < 3 || strlen(value) < 8) {
        return AEGIS_ERR_INVALID;
    }
    return AEGIS_OK;
}

int aegis_session_bind(const char *session_id, const char *machine_id, char *out_binding, size_t out_len) {
    if (session_id == NULL || machine_id == NULL || out_binding == NULL) {
        return AEGIS_ERR_NULL;
    }
    int written = snprintf(out_binding, out_len, "%s@%s", session_id, machine_id);
    if (written < 0 || (size_t)written >= out_len) {
        return AEGIS_ERR_BUFFER;
    }
    return AEGIS_OK;
}

int aegis_attestation_verify(const char *attestation_json, size_t attestation_len) {
    if (attestation_json == NULL) {
        return AEGIS_ERR_NULL;
    }
    if (attestation_len < 2 || attestation_json[0] != '{') {
        return AEGIS_ERR_INVALID;
    }
    return AEGIS_OK;
}
