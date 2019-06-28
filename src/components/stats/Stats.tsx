import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import Character from '../../models/Character';
import ViewStatsPage from './ViewStatsPage';
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

export default class Stats extends Component<Props, State> {

    public constructor(props: Props) {
        super(props);

        let params: any = this.props.match.params;

        this.state = {
            character: this.props.characters.find(c => c.id === parseInt(params.id))
        }
    }

    public componentDidMount() {
        this.props.setHeader(T.translate('generic.characterstats') as string);
    }

    public render() {

        if (!this.state.character) return <Redirect to="/" />;

        return (
            <div>
                <ViewStatsPage onCharChange={this.props.onCharChange} char={this.state.character} />
                <Navigator />
            </div>
        );
    }
}
