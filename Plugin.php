<?php

namespace Kanboard\Plugin\CustomCss;

use Kanboard\Core\Plugin\Base;


class Plugin extends Base
{
    public function initialize() {
        $container = $this->container;

        $this->hook->on('template:layout:css', array('template' => 'plugins/CustomCss/Asset/css/tailwind.min.css'));
        $this->hook->on('template:layout:css', array('template' => 'plugins/CustomCss/Asset/css/styles.min.css'));
    }

    public function onStartup() {

    }

    public function getPluginName() {
        return 'CustomCss';
    }

    public function getPluginDescription() {
        return t('This plugin .');
    }

    public function getPluginAuthor() {
        return 'Yannick Herzog';
    }

    public function getPluginVersion() {
        return '0.1.0';
    }

    public function getPluginHomepage() {
        return 'https://github.com/siryan2/kanboard-plugin-customcss';
    }
}
