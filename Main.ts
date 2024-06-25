function treeObject(obj: any, index: number = 0, path = '') {
    for (const key of Object.getOwnPropertyNames(obj)) {
        const value = obj[key];
        const fullPath = path + key;
        if (typeof value === 'object' && value !== null) {
            if (ImGui.TreeNode(`${key}##TreeObject${fullPath}${index}`)) {
                treeObject(value, index, fullPath + '.');
                ImGui.TreePop();
            }
        } else {
            ImGui.Text(`${key}: ${value} (${typeof value})`);
        }
    }
}

addWindow(
    'UI Handler viewer',
    () => {
        const battleScene = getBattleScene();
        if (battleScene && battleScene.ui && battleScene.ui.handlers) {
            battleScene.ui.handlers.forEach((handler, index) => {
                if (battleScene.ui.mode === index) {
                    ImGui.PushStyleColor(ImGui.ImGuiCol.Text, ImGui.IM_COL32(0, 255, 0, 255));
                }
                if (ImGui.TreeNode(`${handler.constructor.name}##Handlers${index}`)) {
                    if (battleScene.ui.mode === index) {
                        ImGui.PopStyleColor();
                    }
                    treeObject(handler);
                    if (ImGui.TreeNode(`Prototypes##${handler.constructor.name}${index}`)) {
                        let proto = Object.getPrototypeOf(handler);
                        while (proto) {
                            treeObject(proto, index);
                            proto = Object.getPrototypeOf(proto);
                        }
                        ImGui.TreePop();
                    }
                    ImGui.TreePop();
                } else {
                    if (battleScene.ui.mode === index) {
                        ImGui.PopStyleColor();
                    }
                }
            });
        }
    },
    {
        persistentOpen: true,
    }
);
