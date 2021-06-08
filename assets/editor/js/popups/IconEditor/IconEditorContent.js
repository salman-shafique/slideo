import React, { useEffect } from 'react';
import SearchSection from '../components/SearchSection';
import MainSection from '../components/MainSection';
import IconContainer from './IconContainer';
import Events from "Editor/js/Events";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";

import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import constants from "Editor/js/constants";

import useKeyword from '../hooks/useKeyword';

export default function IconEditorContent() {
    const hook = useKeyword('Icon/find_icons');
    const activeIcons = hook.getActiveData();

    const apiCall = (keyword) => {
        return new Promise((resolve) => {
            apiService({
                "url": `/api/editor/call/Icon/find_icons`,
                "data": {
                    "keyword": keyword
                },
                "success": (response) => {
                    resolve({
                        keyword: keyword,
                        data: response.body
                    });
                }
            });
        });
    }

    useEffect(() => {
        Events.listen('presentation.inited', (e) => {
            setTimeout(async () => {
                const shapes = [];

                for (const slide of session.PRESENTATION.slides)
                    shapes.push(...slide.shapes);

                const icons = shapes.filter(shape => shape.data.alt.includes('icon'));
                const keywords = new Set(icons.map(icon => icon.data.keyword?.toLowerCase()).filter(e => e));

                hook.setKeywords(Array.from(keywords).map((keyword, index) => {
                    return {
                        keyword: keyword,
                        active: index === 0 ? true : false
                    }
                }));

                const data = [];

                for (const keyword of keywords.values())
                    data.push(await apiCall(keyword));

                hook.setData(data);
            }, 3000);
        });

        Events.listen('popup.icon.open', (e) => {
            const shapes = session.PRESENTATION.slides.filter(slide => slide.slideId === session.CURRENT_SLIDE)[0].shapes;
            const selectedShape = session.SELECTED_ELEMENTS[0].shapeId;

            const keyword = shapes.filter(shape => shape.data.shape_id == selectedShape)[0].data.keyword;

            if (hook.keywords.filter(oldKeyword => oldKeyword.keyword === keyword.toLowerCase()).length) {
                hook.setKeywords(hook.keywords.map(oldKeyword => {
                    return {
                        keyword: oldKeyword.keyword,
                        active: oldKeyword.keyword === keyword.toLowerCase() ? true : false
                    }
                }));
            }
        });
    }, []);

    return (
        <>
            <SearchSection keywords={hook.keywords} setKeywords={hook.setKeywords} fetchNewData={hook.fetchNewData} type="icon">
                <div className="col-9 m-0 d-flex align-items-center my-white-text">Icon Color</div>
                <div className="col-3 position-static pt-1">
                    <ColorCircle key={"icon"} SHAPE_TYPE={constants.SHAPE_TYPES.ICON} />
                </div>
            </SearchSection>
            <MainSection>
                {
                    activeIcons ? <IconContainer icons={activeIcons} keyword={hook.getActiveKeyword()} /> : undefined
                }
            </MainSection>
        </>
    );
}