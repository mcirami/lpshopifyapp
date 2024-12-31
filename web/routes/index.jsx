import { useState, useCallback, useEffect } from "react";
import { useFindFirst, useQuery } from "@gadgetinc/react";
import {
    Card,
    Layout,
    Page,
    Spinner,
    Text,
    InlineGrid,
    Grid,
    AccountConnection,
    List,
    Button,
    Icon,
    Link,
    Box,
    Divider,
    InlineStack,
    ExceptionList,
    BlockStack,
} from "@shopify/polaris";
import { StoreIcon, IconsIcon } from "@shopify/polaris-icons";
import { api } from "../api";
import { useAppBridge } from "@shopify/app-bridge-react";

import {
    disconnectShopify,
    getStoreRecords,
    getHostUrl,
    updateStoreConnection,
} from "../components/methods";

const gadgetMetaQuery = `
  query {
    gadgetMeta {
      slug
      editURL
      environmentSlug
    }
  }
`;

export default function () {
    const [{ data, fetching, error }] = useFindFirst(api.shopifyShop);
    const [{ data: metaData, fetching: fetchingGadgetMeta }] = useQuery({
        query: gadgetMetaQuery,
    });

    const app = useAppBridge();
    const [connected, setConnected] = useState(false);
    const accountName = connected ? "LinkPro" : "";
    const [storeDomain, setStoreDomain] = useState(app.config.shop);
    const [storeRecords, setStoreRecords] = useState({});
    const hostUrl = getHostUrl();

    const handleConnect = useCallback(() => {
        window.open(
            hostUrl + "/connect-shopify-store?domain=" + encodeURI(storeDomain)
        );
    }, []);

    const handleDisconnect = useCallback(() => {
        getStoreRecords(storeDomain).then((records) => {
            disconnectShopify(records, storeDomain).then((response) => {
                if (response.success) {
                    updateStoreConnection(records[0].id, false, null);
                    setConnected(false);
                }
            });
        });
    }, []);

    useEffect(() => {
        getStoreRecords(storeDomain).then((records) => {
            setStoreRecords(records);
            if (records.length > 0 && records[0].connected) {
                setConnected(true);
            }
        });
    }, []);

    const buttonText = connected
        ? "Disconnect"
        : "Connect Your LinkPro Account";
    const details = connected ? "Account connected" : "No account connected";

    if (error) {
        return (
            <Page title="Error">
                <Text variant="bodyMd" as="p">
                    Error: {error.toString()}
                </Text>
            </Page>
        );
    }

    if (fetching || fetchingGadgetMeta) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
        );
    }

    return (
        <Page title="LinkPro">
            <Layout>
                {connected ? (
                    <>
                        <Layout.Section>
                            <Card>
                                <Box paddingBlockEnd="400">
                                    <Text variant="heading2xl" as="h2">
                                        Boost discovery of your products and
                                        streamline shopping with LinkPro!
                                    </Text>
                                </Box>
                                <Box paddingBlockEnd="200">
                                    <Text variant="headingLg" as="h3">
                                        Enable people to shop your most popular
                                        products right on your LinkPro page!
                                    </Text>
                                </Box>
                                <Box
                                    paddingBlockEnd="400"
                                    paddingBlockStart="400"
                                >
                                    <Divider />
                                </Box>
                                <Box paddingBlockStart="400">
                                    <Text variant="headingMd" as="h4">
                                        How to add products to your LinkPro
                                        page:
                                    </Text>
                                </Box>
                                <Box
                                    paddingBlockStart="400"
                                    paddingBlockEnd="400"
                                >
                                    <List type="number">
                                        <List.Item>
                                            Click "Go To LinkPro" button below
                                        </List.Item>
                                        <List.Item>
                                            After logging in, Go to "Pages" page
                                        </List.Item>
                                        <List.Item>Click "Add Icon"</List.Item>
                                        <List.Item>
                                            Select Integrations tab and choose
                                            "Shopify" from the dropdown list.
                                        </List.Item>
                                        <List.Item>
                                            Select your store and select the
                                            products you want to display.
                                        </List.Item>
                                        <List.Item>Add a link name.</List.Item>
                                        <List.Item>
                                            Click "SAVE" and you are all set!
                                        </List.Item>
                                    </List>
                                </Box>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    url="https://link.pro"
                                    external
                                    size="large"
                                >
                                    Go To LinkPro
                                </Button>
                            </Card>
                        </Layout.Section>
                        <Layout.Section>
                            <AccountConnection
                                accountName={accountName}
                                connected={connected}
                                title="LinkPro"
                                avatarUrl="https://d2qqgh4ebru6pi.cloudfront.net/ce41833e-bc7e-4017-bc67-2abe5b6a2987/images/preview-device-bg.png"
                                action={{
                                    content: buttonText,
                                    onAction: handleDisconnect,
                                }}
                                details={details}
                            />
                        </Layout.Section>
                    </>
                ) : (
                    <Layout.Section>
                        <Card>
                            <InlineGrid columns={["twoThirds", "oneThird"]}>
                                <BlockStack gap="200">
                                    <Text variant="heading2xl" as="h2">
                                        Boost discovery of your products and
                                        streamline shopping with LinkPro
                                    </Text>

                                    <ExceptionList
                                        items={[
                                            {
                                                icon: StoreIcon,
                                                description:
                                                    "Enable people to shop your most popular products right on your LinkPro page.",
                                            },
                                            {
                                                icon: IconsIcon,
                                                description:
                                                    " Build your brand by sharing your latest content and events, grow your subscriber list, and more",
                                            },
                                        ]}
                                    />
                                    <Divider borderColor="transparent" />
                                    <Box>
                                        <AccountConnection
                                            accountName={accountName}
                                            connected={connected}
                                            title="LinkPro"
                                            avatarUrl="https://d2qqgh4ebru6pi.cloudfront.net/ce41833e-bc7e-4017-bc67-2abe5b6a2987/images/preview-device-bg.png"
                                            action={{
                                                content: buttonText,
                                                onAction: handleConnect,
                                            }}
                                            details={details}
                                        />
                                    </Box>
                                    <Divider borderColor="transparent" />
                                    {!connected && (
                                        <Box>
                                            <Text variant="bodyMd" as="p">
                                                Don't have an account yet?
                                            </Text>
                                            <Link
                                                url={`${hostUrl}/register`}
                                                external
                                            >
                                                Click Here To Create a LinkPro
                                                Account
                                            </Link>
                                        </Box>
                                    )}
                                </BlockStack>
                                <Box>
                                    <img
                                        style={{
                                            width: "100%",
                                            maxWidth: "200px",
                                            margin: "0 auto",
                                        }}
                                        src="https://d2qqgh4ebru6pi.cloudfront.net/ce41833e-bc7e-4017-bc67-2abe5b6a2987/images/img-phone.png"
                                    />
                                </Box>
                            </InlineGrid>
                        </Card>
                    </Layout.Section>
                )}
            </Layout>
        </Page>
    );
}
