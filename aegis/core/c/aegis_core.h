#ifndef AEGIS_CORE_H
#define AEGIS_CORE_H

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

#define AEGIS_CORE_VERSION "0.1.0"

typedef enum aegis_status {
    AEGIS_OK = 0,
    AEGIS_ERR_NULL = -1,
    AEGIS_ERR_BUFFER = -2,
    AEGIS_ERR_INVALID = -3
} aegis_status_t;

int aegis_record_hash(const uint8_t *data, size_t data_len, char *out_hex, size_t out_len);
int aegis_record_validate(const char *json, size_t json_len);
int aegis_signature_verify(const char *alg, const char *kid, const char *value);
int aegis_session_bind(const char *session_id, const char *machine_id, char *out_binding, size_t out_len);
int aegis_attestation_verify(const char *attestation_json, size_t attestation_len);

#ifdef __cplusplus
}
#endif

#endif
