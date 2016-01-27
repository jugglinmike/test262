OUT_DIR ?= test
SRC_DIR ?= src
UPSTREAM ?= git@github.com:tc39/test262.git

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
	rm -rf $(OUT_DIR)

.PHONY: deploy
deploy: clean build
	mv $(OUT_DIR) $(OUT_DIR).tmp
	git checkout master
	git rm -r $(OUT_DIR)
	mv $(OUT_DIR).tmp $(OUT_DIR)
	git add --all $(OUT_DIR)
	git commit -m 'Re-build from source'
	git push $(UPSTREAM) master
	git checkout -
