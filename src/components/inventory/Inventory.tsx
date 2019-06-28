import React, { Component } from 'react';
import Character from '../../models/Character';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import ViewInventoryPage from './ViewInventoryPage';
import Navigator from '../navigator/Navigator';
import T from 'i18n-react';

interface ownProps {
    characters: Character[];
    onCharChange: (char: Character, save: boolean) => void;
    setHeader: (title: string) => void;
}

interface State {
    character: Character;
}

type Props = ownProps & RouteComponentProps;

export default class Inventory extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        let params: any = this.props.match.params;

        this.state = {
            character: this.props.characters.find(c => c.id === parseInt(params.id))
        }
    }

    public componentDidMount() {
        this.props.setHeader(T.translate('navigator.inventory') as string);
    }

    public render() {
        if (!this.state.character) return <Redirect to="/" />;

        return (
            <div style={{
                height: '100%',
                padding: '5px 5px 61px 5px'
            }}>
                <ViewInventoryPage char={this.state.character} onChange={this.props.onCharChange} />
                <Navigator />
            </div>
        );
    }
}
