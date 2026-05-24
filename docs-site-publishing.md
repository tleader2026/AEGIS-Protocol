# Publishing Notes

## Python

Python package path:

```text
aegis/sdk/python
```

Build and check:

```bash
cd aegis/sdk/python
python -m pip install --upgrade build twine
python -m build
python -m twine check dist/*
```

Publish:

```bash
python -m twine upload dist/*
```

## Go

Go module path:

```text
github.com/tleader2026/AEGIS-Protocol/aegis/sdk/go
```

Publish by tagging the module:

```bash
git tag aegis/sdk/go/v0.1.0
git push origin aegis/sdk/go/v0.1.0
```

## TypeScript

The TypeScript SDK is currently a placeholder. Publish after it has real exports and tests.
