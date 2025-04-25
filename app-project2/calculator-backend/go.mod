module calculatorbackend

go 1.22

toolchain go1.24.2

require (
	connectrpc.com/connect v1.18.1
	google.golang.org/protobuf v1.36.6
)

require github.com/rs/cors v1.11.1

replace calculatorbackend => ./
