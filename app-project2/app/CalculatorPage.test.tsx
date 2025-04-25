import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorPage from './page';

describe('CalculatorPage', () => {
  it('performs calculation and displays result', async () => {
    // Mock fetch 返回 8
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: 8 }),
      })
    ) as jest.Mock;

    render(<CalculatorPage />);

    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: '3' } }); // 输入 3
    fireEvent.change(screen.getAllByRole('spinbutton')[1], { target: { value: '5' } }); // 输入 5
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '+' } }); // 选择 +

    fireEvent.click(screen.getByRole('button', { name: '计算' })); // 点击计算

    const result = await screen.findByTestId('result');
    expect(result).toHaveTextContent('结果：8');
  });

  it('shows error message when input is invalid', async () => {
    render(<CalculatorPage />);

    fireEvent.change(screen.getAllByRole('spinbutton')[0], { target: { value: 'abc' } });
    fireEvent.change(screen.getAllByRole('spinbutton')[1], { target: { value: '5' } });

    fireEvent.click(screen.getByRole('button', { name: '计算' }));

    const error = await screen.findByTestId('result');
    expect(error).toHaveTextContent('请输入有效数字');
  });
});
