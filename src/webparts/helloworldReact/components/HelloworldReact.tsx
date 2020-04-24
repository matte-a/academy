import * as React from 'react';
import styles from './HelloworldReact.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { List, values, DetailsList, Persona } from 'office-ui-fabric-react';
import { GraphHelper } from '../../../Helpers/GraphHelper';

export interface IHelloworldReactProps {
  description: string;
  nome: string;
}
export interface IHelloworldReactState {
  items: any[];
  user?: any;
  photo?: any;
}


export default class HelloworldReact extends React.Component<IHelloworldReactProps, IHelloworldReactState> {

  constructor(props: IHelloworldReactProps) {
    super(props);
    this.state = {
      items: []
    };

  }

  public async componentDidMount() {

    var results = [{ name: 'Foo' }, { name: 'Bar' }];
    setTimeout(() => {
      this.setState({ items: results });
    }, 2000);

    const user = await GraphHelper.getUser();

    const res = await GraphHelper.getUserPhoto();

    var reader = new FileReader();
    reader.readAsDataURL(res);
    reader.onloadend = () => {
      var base64data = reader.result;
      this.setState({ photo: base64data });
    };

    this.setState({ user: user });

  }

  public render(): React.ReactElement<IHelloworldReactProps> {
    return (
      <div className={styles.helloworldReact}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <DetailsList items={this.state.items} />
              {this.state.photo && <img src={this.state.photo}></img>}

              {
                this.state.items.map((val) => {
                  return (
                    <input placeholder={val.name}></input>
                  );
                })

              }
              {this.test()}

              {/* <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a onClick={this.onLinkClick} className={styles.button}>
                <span className={styles.label}>{this.props.nome}</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  private test = () => {
    return (<div>ciao</div>);
  }
  private onLinkClick = (ev: React.MouseEvent) => {
    this.setState({ items: [] });
  }

}
