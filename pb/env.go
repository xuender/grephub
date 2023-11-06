package pb

func NewEnv() *Env {
	return &Env{
		Port:    8080, // nolint: gomnd
		Upgrade: "upgrade",
	}
}
