function treeObject(obj, index, path) {
    if (index === void 0) { index = 0; }
    if (path === void 0) { path = ''; }
    for (var _i = 0, _a = Object.getOwnPropertyNames(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        var value = obj[key];
        var fullPath = path + key;
        if (typeof value === 'object' && value !== null) {
            if (ImGui.TreeNode("".concat(key, "##TreeObject").concat(fullPath).concat(index))) {
                treeObject(value, index, fullPath + '.');
                ImGui.TreePop();
            }
        }
        else {
            ImGui.Text("".concat(key, ": ").concat(value, " (").concat(typeof value, ")"));
        }
    }
}
addWindow('UI Handler viewer', function () {
    var battleScene = getBattleScene();
    if (battleScene && battleScene.ui && battleScene.ui.handlers) {
        battleScene.ui.handlers.forEach(function (handler, index) {
            if (battleScene.ui.mode === index) {
                ImGui.PushStyleColor(ImGui.ImGuiCol.Text, ImGui.IM_COL32(0, 255, 0, 255));
            }
            if (ImGui.TreeNode("".concat(handler.constructor.name, "##Handlers").concat(index))) {
                if (battleScene.ui.mode === index) {
                    ImGui.PopStyleColor();
                }
                treeObject(handler);
                if (ImGui.TreeNode("Prototypes##".concat(handler.constructor.name).concat(index))) {
                    var proto = Object.getPrototypeOf(handler);
                    while (proto) {
                        treeObject(proto, index);
                        proto = Object.getPrototypeOf(proto);
                    }
                    ImGui.TreePop();
                }
                ImGui.TreePop();
            }
            else {
                if (battleScene.ui.mode === index) {
                    ImGui.PopStyleColor();
                }
            }
        });
    }
}, {
    persistentOpen: true,
});
