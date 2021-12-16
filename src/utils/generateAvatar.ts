import { createAvatar as create} from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

const createAvatar = () => {
    return create(style);
}

export default createAvatar;
