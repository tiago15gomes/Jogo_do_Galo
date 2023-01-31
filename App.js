import React, { useState } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity
} from 'react-native';
import Board from './components/Board';
import { mainApp } from './styles/styles'

export default function App() {

  //jogador,jogo
  const [playerTurn, changeTurn] = useState(true);
  const [end, endGame] = useState(false);
  const [modal, toggleModal] = useState(false);

  //Mensagem do resultado
  const [result, setResult] = useState('');

 
  const [turns, setTurn] = useState({});

  //jogadas dos jogadores
  const togglePlayer = () => changeTurn(!playerTurn);
  const toggleGame = () => endGame(!end);
  const triggerModal = () => toggleModal(!modal)

  //novo jogo
  const newGame = () => {
    setTurn({});
    endGame(false);
    toggleModal(false);
    changeTurn(true);
  };

  //fim do jogo
  const finishGame = () => {
    endGame();
    triggerModal();
  };

  function checkWinner() {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (turns[a] === turns[b] && turns[b] === turns[c] && a in turns && b in turns && c in turns) {
        //vencedor
        setResult(playerTurn ? 'Parabéns Tiago!' : 'Parabéns Rafael!');
        finishGame();
      }
    }

    //quadro cheio, empate
    if (Object.keys(turns).length === 9) {
      setResult('Empate!');
      finishGame();
    }
  }

  function checkTurn(value) {
    const tempTurns = turns;
    tempTurns[value] = playerTurn ? 'X' : 'O';

    
    setTurn({ ...tempTurns });

    //verificar vencedor
    checkWinner();
    togglePlayer();
  }

  return (
    <View style={mainApp.container}>
      <Text style={mainApp.paragraph}>Jogo do galo</Text>
      {!end && (
        <Board
          turns={turns}
          checkTurn={checkTurn}
        />
      )}
      <Modal animationType={'slide'} visible={modal}>
        <View style={mainApp.centeredView}>
          <View style={mainApp.modalView}>
            <Text style={mainApp.h2}>{result}</Text>
            <TouchableOpacity style={mainApp.purpleButton} onPress={newGame}>
              <Text style={mainApp.whiteButtonText}>Novo jogo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={mainApp.legend}>
        <Text style={mainApp.subheader}>X - Tiago</Text>
        <Text style={mainApp.subheader}>O - Rafael</Text>
      </View>
    </View>
  );
}