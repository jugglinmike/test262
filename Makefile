OUT_DIR ?= test

.PHONY: build
build:
	./tools/generation/compile.py -o $(OUT_DIR) src/cases/

.PHONY: clean
clean:
	rm -r $(OUT_DIR)
