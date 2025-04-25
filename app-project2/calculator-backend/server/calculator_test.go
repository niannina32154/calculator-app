package server

import (
	"context"
	"testing"

	calcv1 "calculatorbackend/gen/proto/calculator/v1"
	"connectrpc.com/connect"
)

func TestCalculator_Add(t *testing.T) {
	s := &CalculatorServer{}
	req := connect.NewRequest(&calcv1.CalculationRequest{
		A:        1,
		B:        2,
		Operator: "+",
	})

	res, err := s.Calculate(context.Background(), req)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if res.Msg.Result != 3 {
		t.Errorf("expected 3, got %v", res.Msg.Result)
	}
}
