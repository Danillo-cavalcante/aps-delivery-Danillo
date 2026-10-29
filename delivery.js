function autenticar(usuarios, email, senha) {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return false;
  return usuario.senha === senha && usuario.ativo === true;
}

function forcaSenha(senha) {
  if (senha.length < 8) return 'fraca';

  const tipos = [
    /[a-z]/.test(senha),
    /[A-Z]/.test(senha),
    /\d/.test(senha),
    /[^a-zA-Z0-9]/.test(senha),
  ].filter(Boolean).length;

  return tipos >= 3 ? 'forte' : 'media';
}

function podeLogar(usuario) {
  return usuario.status === 'ativo' && usuario.falhas < 3;
}

function calcularFrete(distanciaKm) {
  if (distanciaKm <= 0) throw new Error('Distância inválida');
  if (distanciaKm <= 3) return 5;
  return 5 + (distanciaKm - 3) * 1.5;
}

function aplicarCupom(valor, cupom) {
if (!cupom) return valor;

  const descontos = { PRIMEIRA10: 0.1, VIP20: 0.2 };
  if (!(cupom in descontos)) throw new Error('Cupom inválido');

  const final = valor * (1 - descontos[cupom]);
  return Math.round(final * 100) / 100;
}

module.exports = { autenticar, forcaSenha, podeLogar, calcularFrete, aplicarCupom };