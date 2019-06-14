import SHOP_DATA from './shop.data';
import { createContext } from 'react';

const CollectionsContext = createContext(SHOP_DATA);

export default CollectionsContext;
