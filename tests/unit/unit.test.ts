import * as postService from '../../src/services/postService'
import * as postRepository from '../../src/repositories/postRepository'
import * as authRepository from '../../src/repositories/authRepository'

beforeEach(() => {
    jest.clearAllMocks();
  });
  
  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

describe("unit", () => {
    it("test create post",async () => {
        const post = {
            usersId: '1',
            title: 'asdadasda',
            text: 'asdasdasda',
            image: 'asdasdasd',
            summary: ''
        }
        const userId = 1
        jest.spyOn(authRepository, 'findById').mockResolvedValueOnce({
            id: userId,
            email: 'j@gmail.com',
            password: '122342342'
        })  
        jest.spyOn(postRepository, 'findTitleAndId').mockResolvedValueOnce(
        null)
        jest.spyOn(postRepository, 'create').mockResolvedValueOnce(
        {
            id: 1,
            title: 'asdasdas',
            usersId: userId,
            text: 'dasdawwadw',
            image: 'sdadada',
            createAt: new Date(),
            summary: ''
        }
        )
        await expect(postService.createPost(post, userId)).resolves.not.toThrow()
    })
})