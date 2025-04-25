package server

import (
	"context"
	"errors"

	calcv1 "calculatorbackend/gen/proto/calculator/v1"

	"connectrpc.com/connect"
)

type CalculatorServer struct{}

func (s *CalculatorServer) Calculate(
	ctx context.Context,
	req *connect.Request[calcv1.CalculationRequest],
) (*connect.Response[calcv1.CalculationResponse], error) {
	a := req.Msg.GetA()
	b := req.Msg.GetB()
	operator := req.Msg.GetOperator()

	var result float64
	var err error

	switch operator {
	case "+":
		result = a + b
	case "-":
		result = a - b
	case "*":
		result = a * b
	case "/":
		if b == 0 {
			err = errors.New("cannot divide by zero")
		} else {
			result = a / b
		}
	default:
		err = errors.New("invalid operator: must be one of +, -, *, /")
	}

	if err != nil {
		return nil, connect.NewError(connect.CodeInvalidArgument, err)
	}

	return connect.NewResponse(&calcv1.CalculationResponse{
		Result: result,
	}), nil
}
