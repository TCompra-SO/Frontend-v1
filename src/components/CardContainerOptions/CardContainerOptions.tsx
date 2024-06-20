import {
    CSSProperties,
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import {
    CardOptionsType,
    Option,
  } from "../../models/CardContainerModels/CardContainerOptions.model";
  import { Card, Col, Row } from "antd";
  import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
  import "./CardContainerOptionsStyles.css";
import { useMediaQuery } from "../../hooks/use-media-query";
  const CarContainerOptions = ({ listOptions }: CardOptionsType) => {
    const [cardsForPage, setCardsForPage] = useState(4);
    const [page, setPage] = useState(0);
  
    const [listOptionsState, setListOptionsState] = useState(listOptions);
    const [showCardText, setShowCardText] = useState(true);
  
    const windowSize1024 = useMediaQuery("(max-width: 1024px)");
    const windowSize780 = useMediaQuery("(max-width: 780px)");
    const windowSize600 = useMediaQuery("(max-width: 600px)");
    const windowSize420 = useMediaQuery("(max-width: 420px)");
  
    const cardStyles: CSSProperties = {
      textAlign: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
    };
  
    const listOptionsMemo = useMemo(() => {
      return listOptionsState.slice(page, page + cardsForPage);
    }, [page, cardsForPage, listOptionsState]);
  
    const nextPage = useCallback(() => {
      if (page + cardsForPage >= listOptionsState.length) {
        return;
      }
      setPage(page + cardsForPage);
      setListOptionsState((prevListOptions) => {
        return prevListOptions.map((option, index) => {
          if (index === page + cardsForPage) return { ...option, selected: true };
          return { ...option, selected: false };
        });
      });
    }, [page, cardsForPage, listOptionsState]);
  
    const prevPage = useCallback(() => {
      if (page === 0) {
        return;
      }
      setPage(page - cardsForPage);
      setListOptionsState((prevListOptions) => {
        return prevListOptions.map((option, index) => {
          if (index === page - cardsForPage) return { ...option, selected: true };
          return { ...option, selected: false };
        });
      });
    }, [page, cardsForPage]);
  
    const returnStyleCard = (option: Option) => {
      if (option.selected) return "select-card";
    };
  
    useEffect(() => {
      if (windowSize420) {
        setCardsForPage(2);
        setShowCardText(false);
        if (page === listOptionsState.length - 2) {
          setPage((prevValue) => prevValue - 2);
        }
      } else if (windowSize600) {
        setCardsForPage(3);
        setShowCardText(false);
        if (page === listOptionsState.length - 2) {
          setPage((prevValue) => prevValue - 2);
        }
      } else if (windowSize780) {
        setCardsForPage(3);
        setShowCardText(true);
        if (page === listOptionsState.length - 2) {
          setPage((prevValue) => prevValue - 2);
        }
      } else if (windowSize1024) {
        setCardsForPage(4);
        setShowCardText(true);
        if (page === listOptionsState.length - 2) {
          setPage((prevValue) => prevValue - 2);
        }
      } else {
        setCardsForPage(4);
        setShowCardText(true);
      }
    }, [
      windowSize420,
      windowSize600,
      windowSize780,
      windowSize1024,
      page,
      listOptionsState,
    ]);
  
    const selectCard = (option: Option) => {
      setListOptionsState((prevListOptions) => {
        return prevListOptions.map((optionIteration) => {
          if (optionIteration.id === option.id)
            return { ...optionIteration, selected: true };
          return { ...optionIteration, selected: false };
        });
      });
    };
  
    return (
      <div>
        <Row gutter={5}>
          <Col span={4}>
            <Card
              hoverable={page === 0 ? false : true}
              style={{ opacity: page === 0 ? 0.5 : 1 }}
              onClick={prevPage}
            >
              <div style={cardStyles}>
                <div><ArrowLeftOutlined /></div>
              {showCardText && <div>Anterior</div>}
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Row gutter={6} justify="center">
              {listOptionsMemo.map((option) => (
                <Col key={option.id} span={24 / listOptionsMemo.length}>
                  <Card
                    hoverable
                    className={returnStyleCard(option)}
                    onClick={() => selectCard(option)}
                  >
                    <div style={cardStyles}>
                      <div>{option.icon}</div>
                      {showCardText && <div>{option.text}</div>}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={4}>
            <Card
              hoverable={
                page + cardsForPage >= listOptionsState.length ? false : true
              }
              onClick={nextPage}
              style={{
                opacity: page + cardsForPage >= listOptionsState.length ? 0.5 : 1
              }}
            >
              <div style={cardStyles}>
                <div>
                  <ArrowRightOutlined />
                </div>
                  {showCardText && <div>Siguiente</div>}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  export { CarContainerOptions };
  