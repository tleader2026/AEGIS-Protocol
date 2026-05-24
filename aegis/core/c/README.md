# aegis_core

`aegis_core` is the boring, durable C primitive for AEGIS records. It provides the stable ABI that higher-level SDKs can bind to.

## MVP Surface

```c
int aegis_record_hash(const uint8_t *data, size_t data_len, char *out_hex, size_t out_len);
int aegis_record_validate(const char *json, size_t json_len);
int aegis_signature_verify(const char *alg, const char *kid, const char *value);
int aegis_session_bind(const char *session_id, const char *machine_id, char *out_binding, size_t out_len);
int aegis_attestation_verify(const char *attestation_json, size_t attestation_len);
```

The current implementation is intentionally minimal. Candidate-standard releases should replace the MVP hash and signature placeholders with vetted cryptographic dependencies and conformance test vectors.

## Build

```bash
cc -std=c11 -Wall -Wextra -pedantic aegis_core.c test_aegis_core.c -o test_aegis_core
./test_aegis_core
```
