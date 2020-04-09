import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Character from '../models/Character';
import Navigator from '../components/navigator/Navigator';
import StatsPage from './StatsPage';
import InventoryPage from './InventoryPage';
import PotentialsPage from './PotentialsPage';
import NotesPage from './NotesPage';

interface Props {
    onSaveCharacter: (character: Character) => void;
    characters: Character[];
}

export default function DetailPage(props: Props) {
    const [tab, setTab] = useState<number>(0);
    const { id } = useParams();
    const selectedCharacter = useMemo(() => props.characters.find((char) => char._id === id), [id, props.characters]);

    return (
        <div style={{ height: 'calc(100% - 57px)' }}>
            {tab === 0 && <StatsPage char={selectedCharacter} onChange={props.onSaveCharacter} />}
            {tab === 1 && <InventoryPage char={selectedCharacter} onChange={props.onSaveCharacter} />}
            {tab === 2 && <PotentialsPage char={selectedCharacter} onChange={props.onSaveCharacter} />}
            {tab === 3 && <NotesPage char={selectedCharacter} onChange={props.onSaveCharacter} />}
            <Navigator currentTab={tab} onTabChange={(evt, value) => setTab(value)} />
        </div>
    );
}