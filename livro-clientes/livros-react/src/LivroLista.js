/* eslint-disable jsx-a11y/scope */
import React, {useState, useEffect} from "react";
import ControleLivros from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";

const controleLivros = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = props => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora;

    return (
        <tr>
            <td>
                <p>{livro.titulo}</p>
                <button className="btn btn-danger pull-right" onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora(livro.codEditora)}</td>
            <td>
                <ul>
                {livro.autores.map((autor, index) => (
                    <li key={index}>{autor}</li>
                ))}
                </ul>
            </td>
        </tr>
    );
}

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        controleLivros.obterLivros()
            .then(livros => setLivros(livros))
            .then(() => setCarregado(true));
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivros.excluir(codigo)
            .then(() => setCarregado(false));
    }

    return (
        <main class="container">
            <h1>Catálogo de Livros</h1>
            <table className="table table-hover">
                <thead className="table-dark">
                    <tr scope="row">
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                {livros.map((livro, index) => (
                    <LinhaLivro
                        key={index}
                        livro={livro}
                        excluir={excluir}
                        getNomeEditora={controleEditora.getNomeEditora}
                    />
                ))}
                </tbody>
            </table>
        </main>
    )
}

export default LivroLista;
