#include "aegis_core.h"

#include <stdio.h>
#include <string.h>

static int assert_ok(int status, const char *name) {
    if (status != AEGIS_OK) {
        fprintf(stderr, "%s failed with status %d\n", name, status);
        return 1;
    }
    return 0;
}

int main(void) {
    const char *record = "{\"aegisVersion\":\"1.0-draft\",\"signature\":{\"alg\":\"EdDSA\",\"kid\":\"key\",\"value\":\"signature\"}}";
    char hash[32];
    char binding[128];

    if (assert_ok(aegis_record_hash((const uint8_t *)record, strlen(record), hash, sizeof(hash)), "aegis_record_hash")) {
        return 1;
    }
    if (assert_ok(aegis_record_validate(record, strlen(record)), "aegis_record_validate")) {
        return 1;
    }
    if (assert_ok(aegis_signature_verify("EdDSA", "key", "signature"), "aegis_signature_verify")) {
        return 1;
    }
    if (assert_ok(aegis_session_bind("aegis:session:test", "aegis:machine:test", binding, sizeof(binding)), "aegis_session_bind")) {
        return 1;
    }
    if (assert_ok(aegis_attestation_verify("{\"type\":\"adapter-backed\"}", strlen("{\"type\":\"adapter-backed\"}")), "aegis_attestation_verify")) {
        return 1;
    }

    printf("aegis_core ok %s %s\n", hash, binding);
    return 0;
}
