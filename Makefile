OUT_DIR ?= test
SRC_DIR ?= src

.PHONY: build
build: build-static build-cases

.PHONY: build-static
build-static:
	cp -r $(SRC_DIR)/static $(OUT_DIR)

.PHONY: build-cases
build-cases:
	./tools/generation/compile.py \
		--no-clobber $(SRC_DIR)/static \
		-o $(OUT_DIR) \
		$(SRC_DIR)/cases/

.PHONY: clean
clean:
	rm -r $(OUT_DIR)
