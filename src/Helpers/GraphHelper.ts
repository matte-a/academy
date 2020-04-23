
import { MSGraphClient, MSGraphClientFactory } from '@microsoft/sp-http';
import { User } from '@microsoft/microsoft-graph-types';


export class GraphHelper {
    private static client: MSGraphClient;
    public static async init(clientFactory: MSGraphClientFactory) {
        return clientFactory.getClient().then((client) => {
            GraphHelper.client = client;
            return undefined;
        })
            .catch((err) => {
                return err;
            });

    }

    public static getUser() {
        return GraphHelper.client.api("/me").get()
            .then((value) => { return value; })
            .catch((err) => {
                console.error(err);
                return undefined;
            });
    }


}