APP = grephub
PACKAGE = github.com/xuender/${APP}
VERSION = $(shell git describe --tags)
BUILD_TIME = $(shell date +%F' '%T)
OUT = build/bin
DEB = ${OUT}/deb
DESKTOP = ${DEB}/usr/share/applications/${APP}.desktop
CONTROL = ${DEB}/DEBIAN/control

default: lint-fix test

tools:
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	go install github.com/cespare/reflex@latest

lint:
	golangci-lint run --timeout 60s --max-same-issues 50 ./...

lint-fix:
	golangci-lint run --timeout 60s --max-same-issues 50 --fix ./...

test:
	go test -race -v ./... -gcflags=all=-l -cover

watch-test:
	reflex -t 50ms -s -- sh -c 'go test -race -v ./...'

clean:
	rm -rf build/bin

build-all: clean build-ui build-file build-deb

proto:
	protoc --go_out=. pb/*.proto

build-ui:
	frontend/node_modules/.bin/ng build

build-file:
	wails build -s -platform linux/amd64,windows/arm64,windows/amd64 -nsis -ldflags \
	"-X 'github.com/xuender/kit/oss.Version=${VERSION}' \
  -X 'github.com/xuender/kit/oss.BuildTime=${BUILD_TIME}'"

build-deb:
	mkdir -p ${DEB}/DEBIAN
	mkdir -p ${DEB}/usr/local/bin
	mkdir -p ${DEB}/usr/share/applications

	cp ${OUT}/${APP}-linux-amd64 ${DEB}/usr/local/bin/${APP}
	mkdir -p ${DEB}/usr/share/pixmaps
	cp build/appicon.png ${DEB}/usr/share/pixmaps/${APP}.png
	mkdir -p ${DEB}/usr/share/icons/hicolor/512x512/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/256x256/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/192x192/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/128x128/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/96x96/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/64x64/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/48x48/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/36x36/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/32x32/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/24x24/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/22x22/apps
	mkdir -p ${DEB}/usr/share/icons/hicolor/16x16/apps
	convert build/appicon.png -resize 512x512 ${DEB}/usr/share/icons/hicolor/512x512/apps/${APP}.png
	convert build/appicon.png -resize 256x256 ${DEB}/usr/share/icons/hicolor/256x256/apps/${APP}.png
	convert build/appicon.png -resize 192x192 ${DEB}/usr/share/icons/hicolor/192x192/apps/${APP}.png
	convert build/appicon.png -resize 128x128 ${DEB}/usr/share/icons/hicolor/128x128/apps/${APP}.png
	convert build/appicon.png -resize 96x96 ${DEB}/usr/share/icons/hicolor/96x96/apps/${APP}.png
	convert build/appicon.png -resize 64x64 ${DEB}/usr/share/icons/hicolor/64x64/apps/${APP}.png
	convert build/appicon.png -resize 48x48 ${DEB}/usr/share/icons/hicolor/48x48/apps/${APP}.png
	convert build/appicon.png -resize 36x36 ${DEB}/usr/share/icons/hicolor/36x36/apps/${APP}.png
	convert build/appicon.png -resize 32x32 ${DEB}/usr/share/icons/hicolor/32x32/apps/${APP}.png
	convert build/appicon.png -resize 24x24 ${DEB}/usr/share/icons/hicolor/24x24/apps/${APP}.png
	convert build/appicon.png -resize 22x22 ${DEB}/usr/share/icons/hicolor/22x22/apps/${APP}.png
	convert build/appicon.png -resize 16x16 ${DEB}/usr/share/icons/hicolor/16x16/apps/${APP}.png

	echo "[Desktop Entry]" > ${DESKTOP}
	echo "Version=1.0" >> ${DESKTOP}
	echo "Type=Application" >> ${DESKTOP}
	echo "Name=Grep Hub" >> ${DESKTOP}
	echo "Exec=${APP}" >> ${DESKTOP}
	echo "Icon=${APP}" >> ${DESKTOP}
	echo "StartupNotify=false" >> ${DESKTOP}
	echo "Terminal=false" >> ${DESKTOP}
	echo "StartupWMClass=Lorca" >> ${DESKTOP}

	echo "Package: ${APP}" > ${CONTROL}
	echo "Version: $(subst ,,$(VERSION:v%=%))" >> ${CONTROL}
	echo "Section: base" >> ${CONTROL}
	echo "Priority: optional" >> ${CONTROL}
	echo "Architecture: amd64" >> ${CONTROL}
	echo "Maintainer: ender xu<xuender@gmail.com>" >> ${CONTROL}
	echo "Description: GrepHub is a GUI that supports multiple popular search tools" >> ${CONTROL}

	dpkg-deb --build ${DEB} build/bin/${APP}.deb

wire:
	wire gen ${PACKAGE}/app