APP = grephub
PACKAGE = github.com/xuender/${APP}
VERSION = $(shell git describe --tags)
BUILD_TIME = $(shell date +%F' '%T)
OUT = build/bin
DEB = ${OUT}/deb

default: lint-fix test

tools:
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

lint:
	golangci-lint run --timeout 60s --max-same-issues 50 ./...

lint-fix:
	golangci-lint run --timeout 60s --max-same-issues 50 --fix ./...

test:
	go test -race -v ./... -gcflags=all=-l -cover

clean:
	rm -rf build/bin

proto:
	protoc --go_out=. pb/*.proto

build-linux: clean
	wails build -platform linux/amd64 -ldflags \
	"-X 'github.com/xuender/kit/oss.Version=${VERSION}' \
  -X 'github.com/xuender/kit/oss.BuildTime=${BUILD_TIME}'"

build-deb: build-linux
	mkdir -p ${DEB}/DEBIAN
	mkdir -p ${DEB}/usr/local/bin
	mkdir -p ${DEB}/usr/share/applications

	cp ${OUT}/${APP} ${DEB}/usr/local/bin/${APP}

	mkdir -p ${DEB}/usr/share/pixmaps
	mkdir -p ${DEB}/usr/share/icons/hicolor/1024x1024/apps
	cp build/appicon.png ${DEB}/usr/share/pixmaps/${APP}.png
	cp build/appicon.png ${DEB}/usr/share/icons/hicolor/1024x1024/apps/${APP}.png

	cp build/linux/${APP}.desktop ${DEB}/usr/share/applications/${APP}.desktop
	cp build/linux/DEBIAN/control ${DEB}/DEBIAN/control
	sed -i 's/VER/$(subst ,,$(VERSION:v%=%))/g' ${DEB}/DEBIAN/control

	dpkg-deb --build ${DEB} ${OUT}/${APP}.deb

wire:
	wire gen ${PACKAGE}/app