import "./products.css";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageProperties from "@amiga-fwk-web/components-layout/page-properties";
import useIntl from "@amiga-fwk-web/components-intl/use-intl";
import FormattedMessage from "@amiga-fwk-web/components-intl/formatted-message";
import FeedbackState from "@amiga-fwk-web/components-feedback/feedback-state";
import Grid, { Col, Row } from "@amiga-fwk-web/components-layout/grid";
import List from "@amiga-fwk-web/components-content/list";
import { SimpleListItem } from "@amiga-fwk-web/components-content/simple-list";
import Label from "@amiga-fwk-web/components-content/label";
import useConfig from "@amiga-fwk-web/config/use-config";
import useApi from "@/hooks/use-api";
import getProducts from "@/rest-clients/wscproducts/get-products";
import type { ItemWithMeta, RenderItemProps } from "@amiga-fwk-web/components-content/list";

export type Product = {
  id: string;
  name: string;
};

type Props = {
  testId?: string;
};

const ProductsPage: React.FC<Props> = ({ testId }) => {
  const config = useConfig();
  const [get] = useApi();
  const intl = useIntl();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts(config.getEndpoint("wscproducts") as string, get);
        setProducts(products);
      } catch (ex) {
        console.error(ex);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnChange = useCallback((products: ItemWithMeta<Product>[]) => {
    setProducts(products);
  }, []);

  const renderItem = ({ onItemClick, item: { id, name } }: RenderItemProps<Product>) => {
    return <SimpleListItem testId={`${testId}-list-element-${id}`} key={id} onClick={onItemClick} label={name} />;
  };

  const pageVariants = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.25,
        ease: "easeOut",
        duration: 0.25,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: "easeIn",
        duration: 0.25,
      },
    },
  };

  return (
    <>
      <PageProperties title={intl.formatMessage({ id: "app.productsPage.title" })} />
      <AnimatePresence mode="wait">
        <motion.div
          className="productsPage"
          initial="hidden"
          variants={pageVariants}
          animate="visible"
          exit="hidden"
          data-testid={testId}
        >
          <Grid type="fluid">
            <Row>
              <Col>
                <div className="productsPage__Container">
                  <div className="productsPage__ContainerHeader">
                    <div className="productsPage__ContainerHeaderLeftSlot">
                      <FormattedMessage id="app.productsPage.title" />
                    </div>
                    <div className="productsPage__ContainerHeaderRightSlot">
                      <Label
                        variant="coconut"
                        color="dark"
                        label={<FormattedMessage id="app.productsPage.counter" values={{ amount: products.length }} />}
                      />
                    </div>
                  </div>
                  <div className="productsPage__ContainerCenter">
                    {loading ? (
                      <FeedbackState
                        testId={`${testId}-loader`}
                        kind="loading"
                        secondaryText={<FormattedMessage id="app.productsPage.label.products" />}
                      />
                    ) : (
                      <List
                        testId={`${testId}-list`}
                        items={products}
                        onChange={handleOnChange}
                        renderItem={renderItem}
                      />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;
