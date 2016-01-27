OUT_DIR ?= test
SRC_DIR ?= src

.PHONY: build
build:
	cp -r src/static $(OUT_DIR)
	./tools/generation/compile.py \
		--no-clobber $(SRC_DIR)/static \
		-o $(OUT_DIR) \
		$(SRC_DIR)/cases/

.PHONY: clean
clean:
	rm -r $(OUT_DIR)
