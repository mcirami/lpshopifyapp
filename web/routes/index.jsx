import { useState, useCallback, useEffect } from "react";
import { useFindFirst, useQuery } from "@gadgetinc/react";
import {
    Layout,
    Page,
    Spinner,
    Text,
    List,
    Button,
    Link,
    InlineStack,
    BlockStack,
    MediaCard,
    Icon,
    Grid,
    Card,
    Box,
} from "@shopify/polaris";
import {
    StoreIcon,
    IconsIcon,
    DomainLandingPageIcon,
} from "@shopify/polaris-icons";
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

export default function Index() {
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
            `${hostUrl}/connect-shopify-store?domain=${encodeURIComponent(
                storeDomain
            )}`
        );
    }, [hostUrl, storeDomain]);

    const handleDisconnect = useCallback(() => {
        getStoreRecords(storeDomain).then((records) => {
            disconnectShopify(records, storeDomain).then((response) => {
                if (response.success) {
                    updateStoreConnection(records[0].id, false, null);
                    setConnected(false);
                }
            });
        });
    }, [storeDomain]);

    useEffect(() => {
        getStoreRecords(storeDomain).then((records) => {
            setStoreRecords(records);
            if (records.length > 0 && records[0].connected) {
                setConnected(true);
            }
        });
    }, [storeDomain]);

    const buttonText = connected
        ? "Disconnect"
        : "Connect Your LinkPro Account";
    const details = connected ? "Account connected" : "No account connected";

    if (error) {
        return (
            <Page title="Error">
                <Text as="p" variant="bodyMd">
                    Error: {error.toString()}
                </Text>
            </Page>
        );
    }

    if (fetching || fetchingGadgetMeta) {
        return (
            <Page>
                <BlockStack alignment="center" spacing="loose">
                    <Spinner accessibilityLabel="Loading" size="large" />
                </BlockStack>
            </Page>
        );
    }

    const Placeholder = ({ text, icon }) => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "1rem",
                }}
            >
                <Icon source={icon} />

                <Text>{text}</Text>
            </div>
        );
    };

    function CardContent() {
        return (
            <div style={{ padding: "20px" }}>
                {connected ? (
                    <InlineStack gap="400">
                        <Text as="h4" variant="headingMd">
                            How to add products to your LinkPro page:
                        </Text>
                        <List type="number" gap="loose">
                            <List.Item>
                                <Link url="https://link.pro/" target="_blank">
                                    Go To Link.pro
                                </Link>
                            </List.Item>
                            <List.Item>
                                After logging in, go to the "Pages" page
                            </List.Item>
                            <List.Item>Click "Add Icon"</List.Item>
                            <List.Item>
                                Select the Integrations tab and choose "Shopify"
                                from the dropdown list.
                            </List.Item>
                            <List.Item>
                                Select your store and the products you want to
                                display.
                            </List.Item>
                            <List.Item>Add a link name.</List.Item>
                            <List.Item>
                                Click "SAVE" and you are all set!
                            </List.Item>
                        </List>
                        <BlockStack gap="400" wrap="false">
                            <Text as="p" variant="bodyMd">
                                Your store is currently connected to LinkPro{" "}
                            </Text>
                            <Button
                                onClick={handleDisconnect}
                                size="slim"
                                external
                            >
                                {buttonText}
                            </Button>
                        </BlockStack>
                    </InlineStack>
                ) : (
                    <InlineStack gap="400">
                        <Text as="h3" variant="headingLg">
                            Your LinkPro Shop
                        </Text>
                        <Placeholder
                            text="Enable people to shop your most popular products
                                right on your LinkPro page."
                            icon={StoreIcon}
                        />
                        <Placeholder
                            text="Build your brand by sharing your latest content and events, grow your subscriber list, and more."
                            icon={DomainLandingPageIcon}
                        />
                        <Placeholder
                            text="Create your own style by uploading your own icons and images to display."
                            icon={IconsIcon}
                        />
                        <Button
                            onClick={handleConnect}
                            variant="primary"
                            size="slim"
                            external
                        >
                            {buttonText}
                        </Button>
                        <Text as="p" variant="bodyMd">
                            By connecting your account, you agree to accept{" "}
                            <Link
                                url="https://link.pro/terms-and-conditions"
                                target="_blank"
                            >
                                LinkPro's Terms and Conditions
                            </Link>
                        </Text>
                    </InlineStack>
                )}
            </div>
        );
    }

    return (
        <Page title="LinkPro">
            <Box background="bg-surface" borderRadius="200">
                <Grid columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
                    <Grid.Cell
                        columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                                borderTopLeftRadius: "8px",
                                borderBottomLeftRadius: "8px",
                            }}
                            src="https://lp-production-images.s3.us-east-2.amazonaws.com/shopify-image-final.png"
                            alt="LinkPro example"
                        />
                    </Grid.Cell>
                    <Grid.Cell
                        columnSpan={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                    >
                        <CardContent />
                    </Grid.Cell>
                </Grid>
            </Box>
        </Page>
    );
}
