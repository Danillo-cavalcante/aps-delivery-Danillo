const {
  autenticar,
  forcaSenha,
  podeLogar,
  calcularFrete,
  aplicarCupom,
} = require('./delivery');

const usuarios = [
  { email: 'ana@delivery.com', senha: 'Ana12345', ativo: true },
  { email: 'bruno@delivery.com', senha: 'Bruno#2024', ativo: false },
];

describe('F1 · autenticar', () => {
  test('CT-01: e-mail e senha corretos de conta ativa autenticam', () => {
    expect(autenticar(usuarios, 'ana@delivery.com', 'Ana12345')).toBe(true);
  });
  test('CT-02: senha incorreta com e-mail válido não autentica', () => {
    expect(autenticar(usuarios, 'ana@delivery.com', 'senhaerrada')).toBe(false);
  });
  test('CT-03: e-mail inexistente não autentica', () => {
    expect(autenticar(usuarios, 'ninguem@delivery.com', 'Ana12345')).toBe(false);
  });
  test('CT-04: conta inativa com senha correta não autentica', () => {
    expect(autenticar(usuarios, 'bruno@delivery.com', 'Bruno#2024')).toBe(false);
  });
});

describe('F2 · forcaSenha', () => {
  test('CT-05: senha com menos de 8 caracteres é fraca', () => {
    expect(forcaSenha('Ab1')).toBe('fraca');
  });
  test('CT-06: 8 caracteres com 1 tipo é media', () => {
    expect(forcaSenha('12345678')).toBe('media');
  });
  test('CT-07: 8 caracteres com 2 tipos é media', () => {
    expect(forcaSenha('Abcdefgh')).toBe('media');
  });
  test('CT-08: 8 caracteres com 4 tipos é forte', () => {
    expect(forcaSenha('Abcdef1!')).toBe('forte');
  });
});

describe('F3 · podeLogar', () => {
  test('CT-09: usuário ativo sem falhas pode logar', () => {
    expect(podeLogar({ status: 'ativo', falhas: 0 })).toBe(true);
  });
  test('CT-10: usuário ativo com 2 falhas ainda pode logar', () => {
    expect(podeLogar({ status: 'ativo', falhas: 2 })).toBe(true);
  });
  test('CT-11: usuário ativo com 3 falhas é bloqueado', () => {
    expect(podeLogar({ status: 'ativo', falhas: 3 })).toBe(false);
  });
  test('CT-12: usuário com status bloqueado não pode logar', () => {
    expect(podeLogar({ status: 'bloqueado', falhas: 0 })).toBe(false);
  });
});

describe('F4 · calcularFrete', () => {
  test('CT-13: distância curta paga frete fixo de 5', () => {
    expect(calcularFrete(2)).toBe(5);
  });
  test('CT-14: exatamente 3 km continua com frete fixo de 5', () => {
    expect(calcularFrete(3)).toBe(5);
  });
  test('CT-15: 5 km paga 5 + 2 × 1,50 = 8', () => {
    expect(calcularFrete(5)).toBe(8);
  });
  test('CT-16: distância negativa lança Distância inválida', () => {
    expect(() => calcularFrete(-2)).toThrow('Distância inválida');
  });
});

describe('F5 · aplicarCupom', () => {
  test('CT-17: sem cupom mantém o valor original', () => {
    expect(aplicarCupom(80, null)).toBe(80);
  });
  test('CT-18: PRIMEIRA10 aplica 10% de desconto', () => {
    expect(aplicarCupom(100, 'PRIMEIRA10')).toBe(90);
  });
  test('CT-19: VIP20 aplica 20% de desconto', () => {
    expect(aplicarCupom(50, 'VIP20')).toBe(40);
  });
  test('CT-20: cupom desconhecido lança Cupom inválido', () => {
    expect(() => aplicarCupom(80, 'CUPOM123')).toThrow('Cupom inválido');
  });
});