# ifeira-api



# questões

sequelize migrations:
ajuda a criar a mesma estrutura para banco de dados diferentes simplesmente mudando o dialeto do banco
pode-se usar um banco sqlite para os testes e outro maior para a produção
mais variáveis de ambiente para usar um sqlite para os testes (variáveis de configuração do banco de ambiente de teste diferentes do banco da produção)

dump do banco:
depende de um banco específico
pode-se usar o docker para subir o banco específico para os testes
variáveis de conexão do banco de testes idêntica ao banco da produção
perigo de rodar os scripts de teste em produção. (considerar fazer verificações em variáveis de ambiente durante a execução dos testes para verificar se é ambiente de produção ... do tipo process.env.NODE_ENV === "test" )