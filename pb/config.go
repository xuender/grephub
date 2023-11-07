package pb

import (
	"os"
	"path/filepath"
	"sort"

	"github.com/pelletier/go-toml/v2"
	"github.com/samber/lo"
	"github.com/xuender/kit/los"
	"github.com/xuender/kit/oss"
)

func NewConfig() *Config {
	dir := filepath.Join(los.Must(os.UserConfigDir()), "ag")
	_ = os.MkdirAll(dir, oss.DefaultDirFileMod)

	cfg := filepath.Join(dir, "agui.toml")

	if oss.Exist(cfg) {
		file := los.Must(os.Open(cfg))
		defer file.Close()

		config := &Config{}
		los.Must0(toml.NewDecoder(file).Decode(config))

		return config
	}

	return &Config{
		Dirs: []string{los.Must(os.Getwd())},
	}
}

func (p *Config) Save() {
	dirs := p.GetDirs()
	dirs = append(dirs, p.GetQuery().GetPaths()...)

	sort.Strings(dirs)
	dirs = lo.Union(dirs)
	p.Dirs = lo.Filter(dirs, func(dir string, _ int) bool { return oss.Exist(dir) })

	dir := filepath.Join(los.Must(os.UserConfigDir()), "ag")
	_ = os.MkdirAll(dir, oss.DefaultDirFileMod)

	file := los.Must(os.Create(filepath.Join(dir, "agui.toml")))
	defer file.Close()

	los.Must0(toml.NewEncoder(file).Encode(p))
}
