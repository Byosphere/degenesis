import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Character from '../models/Character';
import Navigator from '../components/navigator/Navigator';
import T from 'i18n-react';
import StatsPage from './StatsPage';
import InventoryPage from './InventoryPage';
import PotentialsPage from './PotentialsPage';
import NotesPage from './NotesPage';

interface OwnProps {
    setHeader: (title: string) => void;
    onModifyCharacter: (character: Character) => void;
    selectedCharacter: Character;
}

interface State {
    tab: number;
}

type Props = OwnProps & RouteComponentProps;

export default class DetailPage extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            tab: 0
        }
    }

    public componentDidMount() {
        this.setHeader(0);
    }

    public handleTabChange = (event: React.ChangeEvent<{}>, value: any) => {
        this.setState({ tab: value });
        this.setHeader(value);
    }

    public render() {
        return (
            <div style={{ height: 'calc(100% - 57px)' }}>
                {this.state.tab === 0 && <StatsPage char={this.props.selectedCharacter} onChange={this.props.onModifyCharacter} />}
                {this.state.tab === 1 && <InventoryPage char={this.props.selectedCharacter} onChange={this.props.onModifyCharacter} />}
                {this.state.tab === 2 && <PotentialsPage char={this.props.selectedCharacter} onChange={this.props.onModifyCharacter} />}
                {this.state.tab === 3 && <NotesPage char={this.props.selectedCharacter} onChange={this.props.onModifyCharacter} />}
                <Navigator currentTab={this.state.tab} onTabChange={this.handleTabChange} />
            </div>
        );
    }

    private setHeader(value: number) {
        switch (value) {
            case 0:
                this.props.setHeader(T.translate('generic.characterstats', { name: this.props.selectedCharacter.name }) as string);
                break;
            case 1:
                this.props.setHeader(T.translate('navigator.inventory') as string);
                break;
            case 2:
                this.props.setHeader(T.translate('navigator.potentials') as string);
                break;
            case 3:
                this.props.setHeader(T.translate('navigator.notes') as string);
                break;
        }
    }
}