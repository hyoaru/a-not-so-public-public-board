import string

class VigenereCipher:
    _characters = string.ascii_lowercase + string.digits + string.ascii_uppercase + string.punctuation
    _character_index_map = dict(zip(list(_characters), [x for x in range(len(_characters))]))
    _index_character_map = {index: character for character, index in _character_index_map.items()}

    @classmethod
    def encrypt_message(self, message: str, key: str) -> str:
        message_character_index_map = {character: self._character_index_map[character] for character in message if character != ' '}
        index_shift_values = [self._character_index_map[character] for character in key if character != ' ']

        cipher = ''
        index = 0
        for character in message:
            if character == ' ':
                cipher += character
            else:
                # Reset index of `indexShiftValues` to zero if it is greater than key length
                index = 0 if index > len(index_shift_values)-1 else index
                index_shift_value = index_shift_values[index]

                # Getting the character with the shifted index and assigning it to `characterIndex`
                character_index_shifted = self._character_index_map[character] + index_shift_value
                character_index = character_index_shifted
                indexShiftOutOfBounds = character_index_shifted >= len(self._characters)
                if indexShiftOutOfBounds:
                    character_index = self._character_index_map[character] + index_shift_value - len(self._characters)

                # Appending the shifted character to `cipher`
                cipher += self._index_character_map[character_index]
                index += 1

        return cipher
    

    @classmethod
    def decrypt_cipher(self, cipher: string, key: string) -> str:
        cipher_character_index_map = {character: self._character_index_map[character] for character in cipher if character != ' '}
        index_shift_values = [self._character_index_map[character] for character in key if character != ' ']

        message = ''
        index = 0
        for character in cipher:
            if character == ' ':
                message += character
            else:
                # Reset index of `indexShiftValues` to zero if it is greater than key length
                index = 0 if index > len(index_shift_values)-1 else index
                index_shift_value = index_shift_values[index]
                
                # Getting the character with the shifted index and assigning it to `characterIndex`
                character_index_shifted = self._character_index_map[character] - index_shift_value
                character_index = character_index_shifted
                indexShiftOutOfBounds = character_index_shifted < 0
                if indexShiftOutOfBounds:
                    character_index = self._character_index_map[character] - index_shift_value + len(self._characters)

                # Appending the shifted character to `message`
                message += self._index_character_map[character_index]
                index += 1

        return message
