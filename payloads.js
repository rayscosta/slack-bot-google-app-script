const PAYLOADS = {
  formView: context => {
    return {
      "type": "modal",
      "submit": {
        "type": "plain_text",
        "text": "Submit",
        "emoji": true
      },
      "close": {
        "type": "plain_text",
        "text": "Cancel",
        "emoji": true
      },
      "title": {
        "type": "plain_text",
        "text": "Mudar nome do form",
        "emoji": true
      },
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": ":wave: Hey David!\n\nWe'd love to hear from you how we can make this place the best place you’ve ever worked.",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "block_aprovers",
          "element": {
            "type": "multi_users_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select users",
              "emoji": true
            },
            "action_id": "multi_users_action"
          },
          "label": {
            "type": "plain_text",
            "text": "Aprovadores",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "primeira_pergunta",
          "label": {
            "type": "plain_text",
            "text": "What can we do to improve your experience working here?",
            "emoji": true
          },
          "element": {
            "type": "plain_text_input",
            "multiline": true
          }
        },
        {
          "type": "input",
          "block_id": "segunda_pergunta",
          "label": {
            "type": "plain_text",
            "text": "Anything else you want to tell us?",
            "emoji": true
          },
          "element": {
            "type": "plain_text_input",
            "multiline": true
          },
          "optional": true
        }
      ]
    }
  },
  approval: context => {
    return {
      "channel": context.channel,
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Você tem uma nova solicitação:*\nFred Enriquez - New device request"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Descrição: *\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        },
        {
          "type": "actions",
          "block_id": "approval",
          "elements": [
            {
              "type": "button",
              "action_id": "approve",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Aprovar"
              },
              "style": "primary",
              "value": "aprovar"
            },
            {
              "type": "button",
              "action_id": "deny",
              "text": {
                "type": "plain_text",
                "emoji": true,
                "text": "Rejeitar"
              },
              "style": "danger",
              "value": "negar"
            }
          ]
        }
      ]
    }
  },
  approved: context => {
    return {
      "replace_original": "true",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Solicitação aprovada:*\nFred Enriquez - New device request"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Descrição: *\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":chec: Você aprovou esta solicitação, nenhuma ação a mais é necessária"
          }
        }
      ]
    }
  },
  rejected: context => {
    return {
      "replace_original": "true",
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Solicitação rejeitada:*\nFred Enriquez - New device request"
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Descrição: *\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": ":x: Você rejeitou esta solicitação, nenhuma ação a mais é necessária"
          }
        }
      ]
    }
  },
  changeView: context => {
    return {
      "title": {
        "type": "plain_text",
        "text": "Update change",
        "emoji": true
      },
      "submit": {
        "type": "plain_text",
        "text": "Enviar",
        "emoji": true
      },
      "type": "modal",
      "close": {
        "type": "plain_text",
        "text": "Cancelar",
        "emoji": true
      },
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Número da change:*"
          }
        },
        {
          "type": "section",
          "block_id": "category",
          "text": {
            "type": "mrkdwn",
            "text": "*Selecione a categoria do deploy*"
          },
          "accessory": {
            "type": "static_select",
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Aplicação",
                  "emoji": true
                },
                "value": "Aplicação"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Telecomunicações",
                  "emoji": true
                },
                "value": "Telecomunicações"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Banco de dados",
                  "emoji": true
                },
                "value": "Banco de dados"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Monitoramento",
                  "emoji": true
                },
                "value": "Monitoramento"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Provisionamento de infraestrutura",
                  "emoji": true
                },
                "value": "Provisionamento"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Biblioteca de software",
                  "emoji": true
                },
                "value": "Biblioteca"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Servidores",
                  "emoji": true
                },
                "value": "Servidores"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Redes",
                  "emoji": true
                },
                "value": "Redes"
              }
            ],
            "action_id": "static_select_category"
          }
        },
        {
          "type": "input",
          "block_id": "app",
          "element": {
            "type": "plain_text_input",
            "initial_value": context.itemDeConfiguracao,
            "action_id": "application"
          },
          "label": {
            "type": "plain_text",
            "text": "Item de configuração:",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "title",
          "element": {
            "type": "plain_text_input",
            "action_id": "changeTitle",
            "initial_value": context.tituloChange
          },
          "label": {
            "type": "plain_text",
            "text": "Título da change:",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "descript",
          "element": {
            "type": "plain_text_input",
            "multiline": true,
            "initial_value": context.objetivo,
            "action_id": "description"
          },
          "label": {
            "type": "plain_text",
            "text": "Objetivo do deploy:",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "impactedArea",
          "element": {
            "type": "plain_text_input",
            "multiline": true,
            "initial_value": context.areasImpactadas,
            "action_id": "impactedArea"
          },
          "label": {
            "type": "plain_text",
            "text": "Áreas impactadas:",
            "emoji": true
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": ":alert: <https://stonepayments.atlassian.net/wiki/spaces/GGDT/pages/3223454533/Template+de+PR+para+preenchimento+autom+tico+do+ticket#area_impactada-(ObrigatÃ³rio)[Multivalorado]|Lista de áreas>. Neste link consta a lista com as principais áreas da Stone"
            }
          ]
        },
        {
          "type": "input",
          "block_id": "link",
          "element": {
            "type": "plain_text_input",
            "initial_value": context.linkBoard,
            "action_id": "linkCard"
          },
          "label": {
            "type": "plain_text",
            "text": "Link para o card no board do projeto:",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "rBack",
          "element": {
            "type": "plain_text_input",
            "multiline": true,
            "initial_value": context.rollback,
            "action_id": "rollback"
          },
          "label": {
            "type": "plain_text",
            "text": "Plano de rollback:",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "testePlan",
          "element": {
            "type": "plain_text_input",
            "multiline": true,
            "initial_value": context.testPlan,
            "action_id": "plan"
          },
          "label": {
            "type": "plain_text",
            "text": "Plano de testes:",
            "emoji": true
          }
        },
        {
          "type": "input",
          "block_id": "exec",
          "label": {
            "type": "plain_text",
            "text": "Selecione o executor responsável pelo deploy",
            "emoji": true
          },
          "element": {
            "type": "users_select",
            "action_id": "resp_exec",
            "initial_user": context.excutorSlackID
          }
        },
        {
          "type": "input",
          "element": {
            "type": "multi_users_select",
            "action_id": "multi_users_approvers",
            "initial_users": [
              context.businessApproverSlackID,
              context.techApproverSlackID
				    ]
          },
          "label": {
            "type": "plain_text",
            "text": "Aprovadores:",
            "emoji": true
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": ":alert: *Aprovadores técnicos e de negócios devem constar dos respectivos grupos no Stark.*"
            }
          ]
        },
        {
          "type": "input",
          "block_id": "channelID",
          "optional": true,
          "element": {
            "type": "conversations_select",
            "response_url_enabled": true,
            "placeholder": {
              "type": "plain_text",
              "text": "Selecione um canal ou usário",
              "emoji": true
            },
            "action_id": "channel"
          },
          "label": {
            "type": "plain_text",
            "text": "Enviar cópia para um channel?",
            "emoji": true
          }
        }
      ]
    }
  },
  homeView: context => {
    return {
      "user_id": context.user_id,
      "view": {
	      "type": "home",
        "blocks": [
          {
            "type": "rich_text",
            "elements": [
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "emoji",
                    "name": "stay_home_parrot"
                  }
                ]
              }
            ]
          },
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "O que você pode fazer aqui:"
            }
          },
          {
            "type": "rich_text",
            "elements": [
              {
                "type": "rich_text_section",
                "elements": [
                  {
                    "type": "text",
                    "text": "Por favor, utiliza as funcionalidades abaixo se:\n"
                  }
                ]
              },
              {
                "type": "rich_text_list",
                "style": "bullet",
                "elements": [
                  {
                    "type": "rich_text_section",
                    "elements": [
                      {
                        "type": "text",
                        "text": "Você não é líder e deseja ser incluído em todos os invites de CABs de sua área."
                      }
                    ]
                  },
                  {
                    "type": "rich_text_section",
                    "elements": [
                      {
                        "type": "text",
                        "text": "Você é convocado para os CABs de sua área e não deseja mais receber invites de CABs."
                      }
                    ]
                  },
                  {
                    "type": "rich_text_section",
                    "elements": [
                      {
                        "type": "text",
                        "text": "Deseja reverter uma ação anterior."
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "divider"
          },
          {
            "type": "actions",
            "block_id": "{\"actionId\":\"entrar_cab\"}",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Entrar para invites de CAB",
                  "emoji": true
                },
                "style": "primary",
                "value": "create_task"
              }
            ]
          },
          {
            "type": "actions",
            "block_id": "{\"actionId\":\"sair_cab\"}",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "text": "Sair dos invites de CAB\t",
                  "emoji": true
                },
                "value": "create_project",
                "style": "danger"
              }
            ]
          }
        ]
      }
    }
  }
}