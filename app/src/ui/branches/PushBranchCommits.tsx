import * as React from 'react'
import { Dispatcher } from '../../lib/dispatcher'
import { Branch } from '../../models/branch'
import { ButtonGroup } from '../../ui/lib/button-group'
import { Button } from '../../ui/lib/button'
import { Dialog, DialogContent, DialogFooter } from '../../ui/dialog'
import { Repository } from '../../models/repository'

interface IPushBranchCommitsProps {
  readonly dispatcher: Dispatcher
  readonly repository: Repository
  readonly branch: Branch
  readonly unPushedCommits: number
  readonly onPushed: (repository: Repository, branch: Branch) => void
  readonly onDismissed: () => void
}

export class PushBranchCommits extends React.Component<
  IPushBranchCommitsProps
> {
  public render() {
    return (
      <Dialog
        id="push-branch-commits"
        key="push-branch"
        title={
          __DARWIN__
            ? `You Have ${this.props.unPushedCommits} Commits`
            : `You have ${this.props.unPushedCommits} commits`
        }
        onDismissed={this.cancel}
        onSubmit={this.cancel}
      >
        <DialogContent>
          <p>
            The branch must be published before opening a PR. Would you like to
            publish <em>{this.props.branch.name}</em> and oepn a pull request?
          </p>
        </DialogContent>

        <DialogFooter>
          <ButtonGroup>
            <Button type="submit">Cancel</Button>
            <Button onClick={this.push}>
              Push commits and open pull request
            </Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }

  private cancel = () => {
    this.props.onDismissed()
  }

  private push = async () => {
    const props = this.props

    await this.props.dispatcher.push(props.repository)
    this.props.onPushed(props.repository, props.branch)
    this.props.onDismissed()
  }
}
